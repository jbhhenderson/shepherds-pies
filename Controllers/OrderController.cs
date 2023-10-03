using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

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
    
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        Order order = _dbContext.Orders
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
            .SingleOrDefault(o => o.Id == id);
        
        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }
    
    [HttpPost]
    [Authorize]
    public IActionResult Create(Order order)
    {
        order.OrderDate = DateTime.Now;
        _dbContext.Orders.Add(order);
        _dbContext.SaveChanges();
        return Created($"/api/order/{order.Id}", order);
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(int id, Order order)
    {
        Order foundOrder = _dbContext.Orders.SingleOrDefault(o => o.Id == id);

        if (foundOrder == null)
        {
            return NotFound();
        }

        foundOrder.DelivererId = order.DelivererId;
        foundOrder.TableId = order.TableId;
        foundOrder.TipAmount = order.TipAmount;

        _dbContext.SaveChanges();

        return Ok();
    }

}