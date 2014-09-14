using System.Reflection;
using Autofac;
using AutoMapper;
using sportliga.Data;
using sportliga.Domain.Services;


namespace sportliga.api
{
    public class ConfigureDependencies : IBootstrapperTask
    {
        readonly ContainerBuilder _containerBuilder;

        public ConfigureDependencies(ContainerBuilder containerBuilder)
        {
            _containerBuilder = containerBuilder;
        }

        #region IBootstrapperTask Members

        public void Run()
        {
            Assembly data = Assembly.Load("sportLiga.Data");
            Assembly domain = Assembly.Load("sportLiga.Domain");

            _containerBuilder
                .RegisterAssemblyTypes(data, domain)
                .AsImplementedInterfaces();
            _containerBuilder.Register(c => Mapper.Engine).As<IMappingEngine>();
            
        }

        #endregion
    }
}