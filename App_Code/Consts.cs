using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Accuweather.App_Code
{
    public static class Consts
    {
        public static string ACCUWEATHER_API_KEY = DotNetEnv.Env.GetString("ACCUWEATHER_API_KEY");	
    }
}