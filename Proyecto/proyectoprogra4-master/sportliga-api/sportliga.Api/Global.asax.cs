﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using sportliga.api.Controllers;
using sportliga.Api.Controllers;

namespace sportliga.api
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();

            //GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            //WebApiConfig.Register(GlobalConfiguration.Configuration);
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(Ro`uteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);

            BuildContainer();
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //GlobalConfiguration.Configuration.MessageHandlers.Add(new CorsHandler()); 
        }

        public IContainer BuildContainer()
        {
            var containerBuilder = new ContainerBuilder();
            return
                new Bootstrapper(containerBuilder).WithTask(new ConfigureDependencies(containerBuilder))
                    .WithTask(new ConfigureAutomapper())
                    .WithExampleMvcController<HomeController>()
                    .WithExampleWebApiController<AccountController>()
                    .AndAfterContainerIsBuilt(
                        container =>
                        {
                            GlobalConfiguration.Configuration.DependencyResolver =
                                new AutofacWebApiDependencyResolver(container);
                            DependencyResolver.SetResolver(
                                new AutofacDependencyResolver(container));
                        }).Run();
        }
    }
}
