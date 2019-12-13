using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Accuweather.App_Code
{
    public static class Consts
    {
        public static string ACCUWEATHER_API_KEY = DotNetEnv.Env.GetString("ACCUWEATHER_API_KEY");
        public static string ACCUWEATHER_AUTOCOMPLETE_SEARCH = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
        public static string ACCUWEATHER_CURRENT_CONDITIONS = "http://dataservice.accuweather.com/currentconditions/v1/{locationKey}";
    }
}