using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaToppingController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public PizzaToppingController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize]
    public IActionResult Add(int pizzaId, int toppingId)
    {
        Pizza foundPizza = _dbContext.Pizzas.SingleOrDefault(p => p.Id == pizzaId);
        Topping foundTopping = _dbContext.Toppings.SingleOrDefault(t => t.Id == toppingId);

        if (foundPizza == null || foundTopping == null)
        {
            return NotFound();
        }

        PizzaTopping pizzaTopping = new()
        {
            PizzaId = foundPizza.Id,
            ToppingId = foundTopping.Id
        };

        _dbContext.PizzaToppings.Add(pizzaTopping);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpDelete]
    [Authorize]
    public IActionResult Remove(int pizzaId, int toppingId)
    {
        Pizza foundPizza = _dbContext.Pizzas.SingleOrDefault(p => p.Id == pizzaId);
        Topping foundTopping = _dbContext.Toppings.SingleOrDefault(t => t.Id == toppingId);
        PizzaTopping foundPizzaTopping = _dbContext.PizzaToppings.SingleOrDefault(pt => pt.PizzaId == pizzaId && pt.ToppingId == toppingId);

        if (foundPizza == null || foundTopping == null || foundPizzaTopping == null)
        {
            return NotFound();
        }

        if (foundPizzaTopping.PizzaId != foundPizza.Id || foundPizzaTopping.ToppingId != foundTopping.Id)
        {
            return BadRequest();
        }

        _dbContext.PizzaToppings.Remove(foundPizzaTopping);
        _dbContext.SaveChanges();
        return NoContent();
    }
}