using System.ComponentModel.DataAnnotations;
namespace ShepherdsPies.Models;
public class Pizza 
{
    public int Id { get; set; }
    public int? CheeseId { get; set; }
    public Cheese Cheese { get; set; }
    public int? SauceId { get; set; }
    public Sauce Sauce { get; set; }
    public int? SizeId { get; set; }
    public Size Size { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; }
    public List<PizzaTopping> PizzaToppings { get; set; }
    public double PizzaCost {
        get {
            double baseCost = 0;
            
            if (Size != null)
            {
                baseCost = Size.Price;
            }

            if (PizzaToppings != null && PizzaToppings.Count > 0)
            {
                foreach (PizzaTopping pizzaTopping in PizzaToppings)
                {
                    baseCost += .5;
                }
            }

            return baseCost;
        }
    }
}