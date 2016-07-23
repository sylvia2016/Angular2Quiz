using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;

namespace Backend.Controllers
{
    public class FoodPricesController : ApiController
    {
        private MyFoodEntities1 db = new MyFoodEntities1();

        // GET: api/FoodPrices
        public IQueryable<FoodPrice> GetFoodPrice()
        {
            return db.FoodPrice;
        }

        // GET: api/FoodPrices/5
        [ResponseType(typeof(FoodPrice))]
        public IHttpActionResult GetFoodPrice(int id)
        {
            FoodPrice foodPrice = db.FoodPrice.Find(id);
            if (foodPrice == null)
            {
                return NotFound();
            }

            return Ok(foodPrice);
        }

        // PUT: api/FoodPrices/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFoodPrice(int id, FoodPrice foodPrice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != foodPrice.Id)
            {
                return BadRequest();
            }

            db.Entry(foodPrice).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodPriceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/FoodPrices
        [ResponseType(typeof(FoodPrice))]
        public IHttpActionResult PostFoodPrice(FoodPrice foodPrice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FoodPrice.Add(foodPrice);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (FoodPriceExists(foodPrice.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = foodPrice.Id }, foodPrice);
        }

        // DELETE: api/FoodPrices/5
        [ResponseType(typeof(FoodPrice))]
        public IHttpActionResult DeleteFoodPrice(int id)
        {
            FoodPrice foodPrice = db.FoodPrice.Find(id);
            if (foodPrice == null)
            {
                return NotFound();
            }

            db.FoodPrice.Remove(foodPrice);
            db.SaveChanges();

            return Ok(foodPrice);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FoodPriceExists(int id)
        {
            return db.FoodPrice.Count(e => e.Id == id) > 0;
        }
    }
}