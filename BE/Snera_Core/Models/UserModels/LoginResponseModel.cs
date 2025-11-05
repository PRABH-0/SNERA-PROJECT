namespace Snera_Core.Models.UserModels
{
    public class LoginResponseModel
    {
        public string LoginResponseString { get; set; }
        public string? UserEmail { get; set; }
        public string? AccessToken {  get; set; }
    }
}
