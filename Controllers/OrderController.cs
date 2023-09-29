using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShepherdsPies.Data;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public OrderController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Orders
        .Include(o => o.Deliverer)
        .Include(o => o.Receiver)
        .Include(o => o.OrderPizzas)
        .ThenInclude(p => p.Cheese)
        .Include(o => o.OrderPizzas)
        .ThenInclude(p => p.Sauce)
        .Include(o => o.OrderPizzas)
        .ThenInclude(p => p.Size)
        .Include(o => o.OrderPizzas)
        .ThenInclude(p => p.PizzaToppings)
        .ThenInclude(pt => pt.Topping)
        .OrderByDescending(o => o.OrderDate)
        .ToList());
    }
}