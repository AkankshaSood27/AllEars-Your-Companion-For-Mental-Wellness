using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AllEars.Server.Entities
{
    public class Category
    {
        [Key]
        public int category_id { get; set; }

        [Required(ErrorMessage = "Category name is required")]
        [MaxLength(255, ErrorMessage = "Category name should not exceed 255 characters")]
        public string category_name { get; set; }

        public Category() { }

        // Parameterized constructor
        public Category(int category_id, string category_name)
        {
            this.category_id = category_id;
            this.category_name = category_name;
        }
    }
}
