using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Accuweather.App_Code
{
    public static class Consts
    {
        public static string ACCUWEATHER_API_KEY
        {
            get { return DotNetEnv.Env.GetString("ACCUWEATHER_API_KEY"); }
        }
        public static string ACCUWEATHER_AUTOCOMPLETE_SEARCH
        {
            get { return ConfigurationManager.AppSettings["ACCUWEATHER_AUTOCOMPLETE_SEARCH"]; }
        }

        public static string ACCUWEATHER_CURRENT_CONDITIONS
        {
            get { return ConfigurationManager.AppSettings["ACCUWEATHER_CURRENT_CONDITIONS"]; }
        }

    }
}