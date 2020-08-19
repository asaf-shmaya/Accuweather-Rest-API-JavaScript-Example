This is an example project for showing use of following:
Microsoft.AspNet.Mvc, HTML, CSS3, jQuery, Bootstrap, Font Awesome,
Entity Framework - DB First,
Publishing REST Web API,
Consuming REST Web API - Server Side,
Consuming REST Web API - Client Side,
RestSharp,
Newtonsoft.Json,
Swashbuckle - Swagger,
.NetEnv - DotNetEnv,

In order of the project to be functional,
there must be added a file "App_Data/.env"
(you can find reference to it in the .gitignore)
and this file must contain a line for Accuweather
in the following format:

ACCUWEATHER_API_KEY = KEY_WITHOUT_QUOTES

In order of creating the basic DB, you need to edit
the file 'CreateDB.sql' with the right path for your 
sql server. 

The entity framework connection string also requires 
adjusting to your environment. 
