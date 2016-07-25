using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    internal class PriceRestrictAttribute : DataTypeAttribute
    {
        public PriceRestrictAttribute() :base(DataType.Text)
        {

        }

        public override bool IsValid(object value)
        {
            int price = (int)value;

            if (price <= 1000)
                return true;
            else
                return false;
        }
    }
}