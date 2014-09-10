﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Http;
using AcklenAvenue.Data.NHibernate;
using AttributeRouting.Web.Mvc;
using AutoMapper;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using sportliga.Data;
using sportliga.Domain.Entities;
using sportliga.Domain.Services;
using sportliga.Api.Model;
using sportliga.Api.Models;
 



namespace sportliga.Api.Controllers
{
    public class AccountController : ApiController
    {
        readonly IReadOnlyRepository _readOnlyRepository;
        readonly IWriteOnlyRepository _writeOnlyRepository;
        readonly IMappingEngine _mappingEngine;


        public AccountController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository, IMappingEngine mappingEngine)
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
            _mappingEngine = mappingEngine;
        }

        [HttpPost]
        [AcceptVerbs("POST", "HEAD")]
        [POST("register")]
        public CuentaDeUsuario Register([FromBody] AccountRegisterModel model)
        {
            var newUser = _mappingEngine.Map<AccountRegisterModel, CuentaDeUsuario>(model);
            var createdUser = _writeOnlyRepository.Create(newUser);
            var x = Request;
            return createdUser;

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

    public class AccountRegisterModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}