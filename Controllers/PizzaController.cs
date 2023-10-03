using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public PizzaController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        Pizza pizza = _dbContext.Pizzas
            .Include(p => p.Cheese)
            .Include(p => p.Sauce)
            .Include(p => p.Size)
            .Include(p => p.PizzaToppings)
            .ThenInclude(pt => pt.Topping)
            .SingleOrDefault(p => p.Id == id);
        
        if (pizza == null)
        {
            return NotFound();
        }

        return Ok(pizza);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create(Pizza pizza)
    {
        _dbContext.Pizzas.Add(pizza);
        _dbContext.SaveChanges();
        return Created($"/api/pizza/{pizza.Id}", pizza);
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(int id, Pizza pizza)
    {
        Pizza foundPizza = _dbContext.Pizzas.SingleOrDefault(p => p.Id == id);

        if (foundPizza == null)
        {
            return NotFound();
        }

        foundPizza.CheeseId = pizza.CheeseId;
        foundPizza.SauceId = pizza.SauceId;
        foundPizza.SizeId = pizza.SizeId;

        _dbContext.SaveChanges();

        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeletePizza(int id)
    {
        Pizza pizzaToDelete = _dbContext.Pizzas.SingleOrDefault(c => c.Id == id);

        if (pizzaToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Remove(pizzaToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }
}