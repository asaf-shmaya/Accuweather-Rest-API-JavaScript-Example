using Accuweather.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Accuweather.Models.Api
{
    public class AutocompleteSearchResponse
    {
        public List<Favorite> Data { get; set; }

        public class Favorite
        {
            public int LocationKey { get; set; }
            public string LocalizedName { get; set; }
        }
    }
}