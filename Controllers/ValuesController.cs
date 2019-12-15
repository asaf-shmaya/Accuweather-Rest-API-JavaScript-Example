using Accuweather.App_Code;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Accuweather.Controllers
{
    [RoutePrefix("api/values")]
    public class ValuesController : ApiController
    {
        // GET api/values
        [HttpGet]
        [Route("example")]
        public IEnumerable<string> Get()
        {
            return new string[] { "Here", "Comes", "Tesla",  };
        }

        [HttpGet]
        [Route("key/accuweather")]
        public string GetAccuweatherApiKey()
        {
            return Consts.ACCUWEATHER_API_KEY;
        }
    }
}
