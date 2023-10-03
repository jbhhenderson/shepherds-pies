using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ShepherdsPies.Models;
public class Order 
{
    public int Id { get; set; }
    public int? TableId { get; set; }
    public int ReceiverId { get; set; }
    [ForeignKey("ReceiverId")]
    public UserProfile Receiver { get; set; }
    public int? DelivererId { get; set; }
    [ForeignKey("DelivererId")]
    public UserProfile? Deliverer { get; set; }
    public double TipAmount { get; set; }
    public DateTime OrderDate { get; set; }
    public List<Pizza> OrderPizzas { get; set; }
    public double OrderCost {
        get {
            double totalCost = 0;

            if (OrderPizzas != null && OrderPizzas.Count > 0)
            {
                foreach (Pizza pizza in OrderPizzas)
                {
                    totalCost += pizza.PizzaCost;
                }
            }

            if (DelivererId != null)
            {
                totalCost += 5;
            }

            totalCost += TipAmount;

            return totalCost;
        }
    }
}