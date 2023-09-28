using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ShepherdsPies.Models;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Data;
public class ShepherdsPiesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Cheese> Cheeses { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<PizzaTopping> PizzaToppings { get; set; }
    public DbSet<Sauce> Sauces { get; set; }
    public DbSet<Size> Sizes { get; set; }
    public DbSet<Topping> Toppings { get; set; }

    public ShepherdsPiesDbContext(DbContextOptions<ShepherdsPiesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new()
            {
                //Guid.NewGuid()
                Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                UserName = "Administrator",
                Email = "admina@strator.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "dbc40bc6-1234-4ac5-a3ed-180f5e916a5f",
                UserName = "jackson",
                Email = "jackson@henderson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "dbc40bc6-4567-4ac5-a3ed-180f5e916a5f",
                UserName = "sam",
                Email = "sam@ward.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "dbc40bc6-8910-4ac5-a3ed-180f5e916a5f",
                UserName = "will",
                Email = "will@ward.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "dbc40bc6-1112-4ac5-a3ed-180f5e916a5f",
                UserName = "braxton",
                Email = "braxton@smith.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "dbc40bc6-1314-4ac5-a3ed-180f5e916a5f",
                UserName = "baker",
                Email = "baker@wright.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            }
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
        {
            new()
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
            },
            new()
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-1234-4ac5-a3ed-180f5e916a5f"
            },
            new()
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-4567-4ac5-a3ed-180f5e916a5f"
            },
            new()
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-8910-4ac5-a3ed-180f5e916a5f"
            },
            new()
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-1112-4ac5-a3ed-180f5e916a5f"
            },
            new()
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-1314-4ac5-a3ed-180f5e916a5f"
            },
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new()
            {   
                Id = 1,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Admina",
                LastName = "Strator",
                Address = "101 Main Street",
            },
            new()
            {   
                Id = 2,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Jackson",
                LastName = "Henderson",
                Address = "123 Main Street",
            },
            new()
            {   
                Id = 3,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Sam",
                LastName = "Ward",
                Address = "456 Main Street",
            },
            new()
            {   
                Id = 4,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Will",
                LastName = "Ward",
                Address = "789 Main Street",
            },
            new()
            {   
                Id = 5,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Braxton",
                LastName = "Smith",
                Address = "111 Main Street",
            },
            new()
            {   
                Id = 6,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Baker",
                LastName = "Wright",
                Address = "112 Main Street",
            }
        });

        modelBuilder.Entity<Cheese>().HasData(new Cheese[]
        {
            new()
            {
                Id = 1,
                Name = "Buffalo Mozzarella"
            },
            new()
            {
                Id = 2,
                Name = "Four Cheese"
            },
            new()
            {
                Id = 3,
                Name = "Vegan"
            },
            new()
            {
                Id = 4,
                Name = "None (cheeseless)"
            }
        });

        modelBuilder.Entity<Size>().HasData(new Size[]
        {
            new()
            {
                Id = 1,
                Name = "Small (10 inches)",
                Price = 10
            },
            new()
            {
                Id = 2,
                Name = "Medium (14 inches)",
                Price = 12
            },
            new()
            {
                Id = 3,
                Name = "Large (18 inches)",
                Price = 15
            }
        });

        modelBuilder.Entity<Sauce>().HasData(new Sauce[]
        {
            new()
            {
                Id = 1,
                Name = "Marinara"
            },
            new()
            {
                Id = 2,
                Name = "Arrabbiata"
            },
            new()
            {
                Id = 3,
                Name = "Garlic White"
            },
            new()
            {
                Id = 4,
                Name = "None (sauceless pizza)"
            }
        });

        modelBuilder.Entity<Topping>().HasData(new Topping[]
        {
            new()
            {
                Id = 1,
                Name = "Sausage"
            },
            new()
            {
                Id = 2,
                Name = "Pepperoni"
            },
            new()
            {
                Id = 3,
                Name = "Mushroom"
            },
            new()
            {
                Id = 4,
                Name = "Onion"
            },
            new()
            {
                Id = 5,
                Name = "Green Pepper"
            },
            new()
            {
                Id = 6,
                Name = "Black Olive"
            },
            new()
            {
                Id = 7,
                Name = "Basil"
            },
            new()
            {
                Id = 8,
                Name = "Extra Cheese"
            }
        });

        modelBuilder.Entity<Order>().HasData(new Order[]
        {
            new()
            {
                Id = 1,
                ReceiverId = 2,
                DelivererId = 4,
                TipAmount = 4,
                OrderDate = new DateTime(2023, 9, 25, 12, 0, 0)
            },
            new()
            {
                Id = 2,
                ReceiverId = 3,
                DelivererId = 5,
                TipAmount = 6,
                OrderDate = new DateTime(2023, 9, 27, 14, 0, 0)
            }
        });

        modelBuilder.Entity<Pizza>().HasData(new Pizza[]
        {
            new()
            {
                Id = 1,
                CheeseId = 2,
                SauceId = 1,
                SizeId = 3,
                OrderId = 1
            },
            new()
            {
                Id = 2,
                CheeseId = 1,
                SauceId = 2,
                SizeId = 2,
                OrderId = 2
            },
            new()
            {
                Id = 3,
                CheeseId = 2,
                SauceId = 1,
                SizeId = 2,
                OrderId = 2
            },
        });
        
        modelBuilder.Entity<PizzaTopping>().HasData(new PizzaTopping[]
        {
            new()
            {
                Id = 1,
                PizzaId = 1,
                ToppingId = 1
            },
            new()
            {
                Id = 2,
                PizzaId = 1,
                ToppingId = 2
            },
            new()
            {
                Id = 3,
                PizzaId = 2,
                ToppingId = 4
            },
            new()
            {
                Id = 4,
                PizzaId = 3,
                ToppingId = 5
            },
        });
    }
}