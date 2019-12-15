using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Accuweather
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private readonly string envFilePath = $"{System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath}App_Data\\.env";
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //
            DotNetEnv.Env.Load(envFilePath);
            //
            HttpConfiguration httpConfiguration = GlobalConfiguration.Configuration;
            //
            httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            httpConfiguration.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
        }
    }
}
