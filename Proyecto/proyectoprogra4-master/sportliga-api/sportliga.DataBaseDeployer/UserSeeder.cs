using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DomainDrivenDatabaseDeployer;
using FluentNHibernate.Conventions.Helpers;
using NHibernate;
using NHibernate.AdoNet;
using NHibernate.Proxy;
using sportliga.Domain.Entities;
using sportliga.Data;

namespace sportliga.DataBaseDeployer
{
    class UserSeeder : IDataSeeder
    {
        
        readonly ISession _session;

        public UserSeeder (ISession session)
        {
            _session = session;
            
        }

        public void Seed()
        {
            var CuentaDeUsuario = new CuentaDeUsuario
            {
                Email = "test@test.com",
                Name = "Test Name",
                Password = "password"
            };



            _session.Save(CuentaDeUsuario);
           if(validar("password"))
               Console.WriteLine("Contraseña Verificada");
        }

        public bool validar(String contraseña)
        {

           
            ReadOnlyRepository r =new ReadOnlyRepository(_session);
           if(r.First<CuentaDeUsuario>( (CuentaDeUsuario cuenta)=> cuenta.Name == "Test name").Password.CompareTo(Encryptor.Encrypt(contraseña))==0)
                return  true;
            return false;
        }
        
    }
}
