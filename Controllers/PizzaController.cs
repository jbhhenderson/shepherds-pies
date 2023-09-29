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
}