using Accuweather.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Accuweather.Models.Api
{
    public class CurrentConditionsShortResponse
    {
        public List<CurrentWeather> Data { get; set; }

        public class CurrentWeather
        {
            public double CelsiusTemperature { get; set; }
            public string WeatherText { get; set; }
        }
    }
}