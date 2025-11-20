namespace Snera_Core.Common
{
    public static class CommonErrors
    {
        // User Errors
        public const string UserNotFound = "User not found.";
        public const string EmailAlreadyExists = "Email already exists.";
        public const string InvalidEmailFormat = "Invalid email format.";
        public const string InvalidPassword = "Invalid password.";
        public const string WeakPassword = "Password must be at least 6 characters long.";

        // Post Errors
        public const string PostNotFound = "Post not found.";
        public const string PostCreationFailed = "Failed to create the post.";
        public const string PostDetailsNotFound = "Post details not found.";
        public const string SkillCreationFailed = "Failed to create post skills.";
        public const string RoleCreationFailed = "Failed to create post roles.";

        // Generic Errors
        public const string NotFound = "The requested record was not found.";
        public const string Unauthorized = "Unauthorized access.";
        public const string BadRequest = "Bad request.";
        public const string ServerError = "An unexpected error occurred.";

        // Auth Errors
        public const string InvalidCredentials = "Invalid email or password.";
    }
}
