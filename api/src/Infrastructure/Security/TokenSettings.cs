namespace Infrastructure.Security
{
    public static class TokenSettings
    {
        public static string SecretKey = "f1a8e4f960ec7ea941a4f693e3b806c423f767fdadda8399678e708259d4fc972c733f1dc3ce4be0d80272310c430c0d74673b318afcff714a762bbdacb92716";
        public static int ExpiresInMinutes = 1;
        public static int RefreshTimeInMinutes = 1440;
        public static int RenewdRefreshTimeInMinutes = 2880;
    }
}
