using Accuweather.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Accuweather.Models.Api
{
    public class AutocompleteSearchResponse
    {
        public List<tbl_Favories> Data { get; set; }
    }
}