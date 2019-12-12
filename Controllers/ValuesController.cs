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

        // GET api/values/5
        private string Get(int id)
        {
            return "value";
        }

        // POST api/values
        private void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        private void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        private void Delete(int id)
        {
        }
    }
}
