using System.Net;
using System.Web;
using System.Web.Http;
using AcklenAvenue.Data.NHibernate;
using AttributeRouting.Web.Mvc;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using sportliga.Api.Model;
using sportliga.Api.Models;
using sportliga.Data;
using sportliga.Domain.Entities;
using sportliga.Domain.Services;


namespace sportliga.Api.Controllers
{
    public class LoginController : ApiController
    {
        readonly IReadOnlyRepository _readOnlyRepository;


        public LoginController(IReadOnlyRepository readOnlyRepository)
        {

            _readOnlyRepository = readOnlyRepository;
        }

        [HttpPost]
        [AcceptVerbs("POST", "HEAD")]
        [POST("login")]
        public AuthModel Login([FromBody] AccountLoginModel model)
        {
            var user = _readOnlyRepository.FirstOrDefault<CuentaDeUsuario>(x => x.Email == model.Email);
            if (user == null) throw new HttpException((int)HttpStatusCode.NotFound, "User doesn't exist.");
            if (!user.CheckPassword(model.Password))
                throw new HttpException((int)HttpStatusCode.Unauthorized, "Password doesn't match.");
            var authModel = new AuthModel { Token = "SuperHash" };
            return authModel;
        }


    }
}