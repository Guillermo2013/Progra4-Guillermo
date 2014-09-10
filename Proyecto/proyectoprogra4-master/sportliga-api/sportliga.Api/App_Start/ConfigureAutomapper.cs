

using AutoMapper;
using sportliga.Api.Controllers;
using sportliga.Domain.Entities;

namespace sportliga.api
{
    public class ConfigureAutomapper : IBootstrapperTask
    {
        #region IBootstrapperTask Members

        public void Run()
        {
            //automappings go here
            //Ex: Mapper.CreateMap<SomeType, SomeOtherType>().ReverseMap();
            Mapper.CreateMap<AccountRegisterModel, CuentaDeUsuario>().ReverseMap();
        }

        #endregion
    }
}