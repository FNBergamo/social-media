using System.Security.Cryptography;
using System.Text;

namespace Application.Helper
{
    public class HashHelper
    {
        public static string Hash(string input)
        {
            byte[] data = MD5.HashData(Encoding.UTF8.GetBytes(input));
            StringBuilder sBuilder = new();

            foreach (byte t in data)
            {
                sBuilder.Append(t.ToString("x2"));
            }

            return sBuilder.ToString();
        }
    }
}