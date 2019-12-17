using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Accuweather.App_Code;
using Accuweather.EntityFramework;
using RestSharp;

namespace Accuweather.Controllers
{
    [RoutePrefix("api/accuweather")]
    public class AccuweatherController : ApiController
    {
        private AccuweatherDBEntities db = new AccuweatherDBEntities();

        [HttpGet]
        [Route("search")]
        public async Task<Models.Api.AutocompleteSearchResponse> Search(string location) 
        {
            try
            {
                RestClient restClient = new RestClient(Consts.ACCUWEATHER_AUTOCOMPLETE_SEARCH);
                RestRequest restRequest = new RestRequest(Method.GET);
                restRequest.AddParameter("apikey", Consts.ACCUWEATHER_API_KEY);
                restRequest.AddParameter("q", location);

                IRestResponse<QuickType.AutocompleteSearchResponse> response = 
                    restClient.Execute<QuickType.AutocompleteSearchResponse>(restRequest);
                
                List<QuickType.AutocompleteSearchResponse> responseDeserialized = 
                    QuickType.AutocompleteSearchResponse.FromJson(response.Content);

                Models.Api.AutocompleteSearchResponse searchResponse
                    = new Models.Api.AutocompleteSearchResponse()
                    {
                        Data = responseDeserialized.Select(item => new Models.Api.AutocompleteSearchResponse.Favorite() 
                        {   LocationKey = item.Key, 
                            LocalizedName = item.LocalizedName })
                        .ToList<Models.Api.AutocompleteSearchResponse.Favorite>()
                    };

                return searchResponse;
            }
            catch (Exception ex)
            {
                //return $"| Exception | {ex.Message} | InnerException | {ex.InnerException}";
                return null;
            }
        }

        [HttpGet]
        [Route("getCurrentWeather")]
        public async Task<Models.Api.CurrentConditionsShortResponse> GetCurrentWeather(int locationKey)
        {
            try
            {
                RestClient restClient = new RestClient(Consts.ACCUWEATHER_CURRENT_CONDITIONS);
                RestRequest restRequest = new RestRequest("{locationKey}", Method.GET);
                restRequest.AddUrlSegment("locationKey", locationKey);
                restRequest.AddParameter("apikey", Consts.ACCUWEATHER_API_KEY);
                restRequest.AddParameter("details", false);

                IRestResponse<QuickType.CurrentConditionsShortResponse> response = 
                    restClient.Execute<QuickType.CurrentConditionsShortResponse>(restRequest);

                List<QuickType.CurrentConditionsShortResponse> responseDeserialized =
                    QuickType.CurrentConditionsShortResponse.FromJson(response.Content);

                Models.Api.CurrentConditionsShortResponse searchResponse
                    = new Models.Api.CurrentConditionsShortResponse()
                    {
                        Data = responseDeserialized.Select(item => new Models.Api.CurrentConditionsShortResponse.CurrentWeather() 
                        { 
                            CelsiusTemperature = item.Temperature.Metric.Value, 
                            WeatherText = item.WeatherText 
                        }).ToList<Models.Api.CurrentConditionsShortResponse.CurrentWeather>()
                    };

                return searchResponse;
            }
            catch (Exception ex)
            {
                //return $"| Exception | {ex.Message} | InnerException | {ex.InnerException}";
                return null;
            }
        }



        [HttpGet]
        [Route("getFavorites")]
        public IQueryable<tbl_Favories> Gettbl_Favories()
        {
            return db.tbl_Favories;
        }

        //// GET: api/Accuweather/5
        //[ResponseType(typeof(tbl_Favories))]
        //public async Task<IHttpActionResult> Gettbl_Favories(int id)
        //{
        //    tbl_Favories tbl_Favories = await db.tbl_Favories.FindAsync(id);
        //    if (tbl_Favories == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(tbl_Favories);
        //}

        //// PUT: api/Accuweather/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> Puttbl_Favories(tbl_Favories tbl_Favories)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Entry(tbl_Favories).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!tbl_FavoriesExists(tbl_Favories.LocationKey))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/Accuweather
        //[ResponseType(typeof(tbl_Favories))]
        //public async Task<IHttpActionResult> Posttbl_Favories(tbl_Favories tbl_Favories)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.tbl_Favories.Add(tbl_Favories);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = tbl_Favories.LocationKey }, tbl_Favories);
        //}

        //// DELETE: api/Accuweather/5
        //[ResponseType(typeof(tbl_Favories))]
        //public async Task<IHttpActionResult> Deletetbl_Favories(tbl_Favories tbl_FavoriesFromClient)
        //{
        //    tbl_Favories tbl_Favories = await db.tbl_Favories.FindAsync(tbl_FavoriesFromClient.LocationKey);

        //    if (tbl_Favories == null)
        //    {
        //        return NotFound();
        //    }

        //    db.tbl_Favories.Remove(tbl_Favories);
        //    await db.SaveChangesAsync();

        //    return Ok(tbl_Favories);
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private bool tbl_FavoriesExists(int id)
        //{
        //    return db.tbl_Favories.Count(e => e.LocationKey == id) > 0;
        //}
    }
}