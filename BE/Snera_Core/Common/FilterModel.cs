namespace Snera_Core.Models
{
    public class FilterModel
    {
        public int PageNumber { get; set; } = 1;     // Default to first page
        public int PageSize { get; set; } = 10;      // Items per page

        public string? Search { get; set; }          // Optional keyword
        public string? SortBy { get; set; } = "Created_Timestamp";  // Default sort field
        public bool IsDescending { get; set; } = true;              // Default sort order

        // Optional general-purpose filters
        public string? Type { get; set; }            // e.g., Post_Type, UserType, etc.
        public string? State { get; set; }
    }
}
