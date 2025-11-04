namespace Snera_Core.Models.UserModels
{
    public class LoginResponseModel
    {
        public string? UserName { get; set; }
        public string? AccessToken {  get; set; }
        public int ExpireIn {  get; set; }
    }
}
