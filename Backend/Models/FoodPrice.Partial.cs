namespace Backend.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    
    [MetadataType(typeof(FoodPriceMetaData))]
    public partial class FoodPrice
    {
    }

    public partial class FoodPriceMetaData
    {
        [Required]
        public int Id { get; set; }

        [StringLength(10, ErrorMessage = "欄位長度不得大於 10 個字元")]
        public string Name { get; set; }

        //[PriceRestrict]
        [Range(0, 1000, ErrorMessage ="價錢需介於0~1000元之間")]
        public Nullable<int> Price { get; set; }
    }
}
