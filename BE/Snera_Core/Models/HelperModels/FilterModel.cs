namespace Snera_Core.Models.HelperModels
{
    public class FilterModel
    {
        public int PageNumber { get; set; } = 1;     
        public int PageSize { get; set; } = 10;    
        
        public Guid? User_Id { get; set; }

        public string? Search { get; set; }      
        public string? SortBy { get; set; } = "Created_Timestamp";  
        public bool IsDescending { get; set; } = true;           

        public string? Type { get; set; }          
        public string? State { get; set; }
    }
}
