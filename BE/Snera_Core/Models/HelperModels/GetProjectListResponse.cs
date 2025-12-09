namespace Snera_Core.Models.HelperModels
{
        public class GetProjectListResponse
        {
            public int TotalCount { get; set; }
            public int TotalPages { get; set; }
            public int PageNumber { get; set; }
            public int PageSize { get; set; }

            public IEnumerable<object> Projects { get; set; } = new List<object>();
        }

}
