package co.ke.emtechhouse.eims.Utils;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.Role;
import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
@Service
public class InitAuth {
    public Role getRole(){
        String Admin = "{\n" +
                "    \"id\": 1,\n" +
                "    \"name\": \"ROLE_ADMIN\",\n" +
                "    \"basicactions\": [\n" +
                "        {\n" +
                "            \"code\": \"1\",\n" +
                "            \"id\": 186,\n" +
                "            \"name\": \"Dashboard\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"2\",\n" +
                "            \"id\": 187,\n" +
                "            \"name\": \"Add General Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"3\",\n" +
                "            \"id\": 188,\n" +
                "            \"name\": \"Update General Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"4\",\n" +
                "            \"id\": 189,\n" +
                "            \"name\": \"View General Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"5\",\n" +
                "            \"id\": 190,\n" +
                "            \"name\": \"Delete General Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"6\",\n" +
                "            \"id\": 191,\n" +
                "            \"name\": \"Add Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"7\",\n" +
                "            \"id\": 192,\n" +
                "            \"name\": \"Update Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"8\",\n" +
                "            \"id\": 193,\n" +
                "            \"name\": \"View Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"9\",\n" +
                "            \"id\": 194,\n" +
                "            \"name\": \"Delete Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"10\",\n" +
                "            \"id\": 195,\n" +
                "            \"name\": \"Add Invoices Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"11\",\n" +
                "            \"id\": 196,\n" +
                "            \"name\": \"Update Invoices Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"12\",\n" +
                "            \"id\": 197,\n" +
                "            \"name\": \"View Invoices Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"13\",\n" +
                "            \"id\": 198,\n" +
                "            \"name\": \"Delete Invoices Tax Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"14\",\n" +
                "            \"id\": 199,\n" +
                "            \"name\": \"Add Invoices Profile Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"15\",\n" +
                "            \"id\": 200,\n" +
                "            \"name\": \"Update Invoices Profile Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"16\",\n" +
                "            \"id\": 201,\n" +
                "            \"name\": \"View Invoices Profile Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"17\",\n" +
                "            \"id\": 202,\n" +
                "            \"name\": \"Delete Invoices Profile Parameters\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"18\",\n" +
                "            \"id\": 203,\n" +
                "            \"name\": \"Add Organization Details\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"19\",\n" +
                "            \"id\": 204,\n" +
                "            \"name\": \"Update Organization Details\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"20\",\n" +
                "            \"id\": 205,\n" +
                "            \"name\": \"View Organization Details\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"21\",\n" +
                "            \"id\": 206,\n" +
                "            \"name\": \"Delete Organization Details\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"22\",\n" +
                "            \"id\": 207,\n" +
                "            \"name\": \"Add Expense Categories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"23\",\n" +
                "            \"id\": 208,\n" +
                "            \"name\": \"Update Expense Categories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"24\",\n" +
                "            \"id\": 209,\n" +
                "            \"name\": \"View Expense Categories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"25\",\n" +
                "            \"id\": 210,\n" +
                "            \"name\": \"Delete Expense Categories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"26\",\n" +
                "            \"id\": 211,\n" +
                "            \"name\": \"Validate Categories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"27\",\n" +
                "            \"id\": 212,\n" +
                "            \"name\": \"Add Expense SubCategories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"28\",\n" +
                "            \"id\": 213,\n" +
                "            \"name\": \"Update Expense SubCategories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"29\",\n" +
                "            \"id\": 214,\n" +
                "            \"name\": \"View Expense SubCategories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"30\",\n" +
                "            \"id\": 215,\n" +
                "            \"name\": \"Delete Expense SubCategories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"31\",\n" +
                "            \"id\": 216,\n" +
                "            \"name\": \"Validate SubCategories\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"32\",\n" +
                "            \"id\": 217,\n" +
                "            \"name\": \"Add Suppliers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"33\",\n" +
                "            \"id\": 218,\n" +
                "            \"name\": \"Update Suppliers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"34\",\n" +
                "            \"id\": 219,\n" +
                "            \"name\": \"View Suppliers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"35\",\n" +
                "            \"id\": 220,\n" +
                "            \"name\": \"Delete Suppliers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"36\",\n" +
                "            \"id\": 221,\n" +
                "            \"name\": \"Validate Suppliers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"37\",\n" +
                "            \"id\": 222,\n" +
                "            \"name\": \"Add Expenses\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"38\",\n" +
                "            \"id\": 223,\n" +
                "            \"name\": \"Update Expenses\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"39\",\n" +
                "            \"id\": 224,\n" +
                "            \"name\": \"View Expenses\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"40\",\n" +
                "            \"id\": 225,\n" +
                "            \"name\": \"Delete Expenses\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"41\",\n" +
                "            \"id\": 226,\n" +
                "            \"name\": \"Validate Expenses\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"42\",\n" +
                "            \"id\": 227,\n" +
                "            \"name\": \"Add Cost Centers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"43\",\n" +
                "            \"id\": 228,\n" +
                "            \"name\": \"Update Cost Centers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"44\",\n" +
                "            \"id\": 229,\n" +
                "            \"name\": \"View Cost Centers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"45\",\n" +
                "            \"id\": 230,\n" +
                "            \"name\": \"Delete Cost Centers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"46\",\n" +
                "            \"id\": 231,\n" +
                "            \"name\": \"Validate Cost Centers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"47\",\n" +
                "            \"id\": 232,\n" +
                "            \"name\": \"Add PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"48\",\n" +
                "            \"id\": 233,\n" +
                "            \"name\": \"Update PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"49\",\n" +
                "            \"id\": 234,\n" +
                "            \"name\": \"View PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"50\",\n" +
                "            \"id\": 235,\n" +
                "            \"name\": \"Delete PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"51\",\n" +
                "            \"id\": 236,\n" +
                "            \"name\": \"Validate PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"52\",\n" +
                "            \"id\": 237,\n" +
                "            \"name\": \"Confirm Approved PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"53\",\n" +
                "            \"id\": 238,\n" +
                "            \"name\": \"View Unpaid PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"54\",\n" +
                "            \"id\": 239,\n" +
                "            \"name\": \"Pay PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"55\",\n" +
                "            \"id\": 240,\n" +
                "            \"name\": \"View Paid PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"56\",\n" +
                "            \"id\": 241,\n" +
                "            \"name\": \"View Canceled PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"57\",\n" +
                "            \"id\": 242,\n" +
                "            \"name\": \"Validate PurchaseOrders\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"58\",\n" +
                "            \"id\": 243,\n" +
                "            \"name\": \"Enter Accrual\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"59\",\n" +
                "            \"id\": 244,\n" +
                "            \"name\": \"Validate Accrual\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"60\",\n" +
                "            \"id\": 245,\n" +
                "            \"name\": \"Enter Transaction\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"61\",\n" +
                "            \"id\": 246,\n" +
                "            \"name\": \"Validate Transaction\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"62\",\n" +
                "            \"id\": 247,\n" +
                "            \"name\": \"Add Stock\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"63\",\n" +
                "            \"id\": 248,\n" +
                "            \"name\": \"Update Stock\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"64\",\n" +
                "            \"id\": 249,\n" +
                "            \"name\": \"View Stock\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"65\",\n" +
                "            \"id\": 250,\n" +
                "            \"name\": \"Delete Stock\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"66\",\n" +
                "            \"id\": 251,\n" +
                "            \"name\": \"Validate Stock\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"67\",\n" +
                "            \"id\": 252,\n" +
                "            \"name\": \"Add Customer\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"68\",\n" +
                "            \"id\": 253,\n" +
                "            \"name\": \"Update Customer\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"69\",\n" +
                "            \"id\": 254,\n" +
                "            \"name\": \"View Customers\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"70\",\n" +
                "            \"id\": 255,\n" +
                "            \"name\": \"Delete Customer\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"71\",\n" +
                "            \"id\": 256,\n" +
                "            \"name\": \"Validate Customer\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"72\",\n" +
                "            \"id\": 257,\n" +
                "            \"name\": \"Add Invoice\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"73\",\n" +
                "            \"id\": 258,\n" +
                "            \"name\": \"Update Invoice\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"74\",\n" +
                "            \"id\": 259,\n" +
                "            \"name\": \"View Invoices\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"75\",\n" +
                "            \"id\": 260,\n" +
                "            \"name\": \"Delete Invoice\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"76\",\n" +
                "            \"id\": 261,\n" +
                "            \"name\": \"Validate Invoice\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"77\",\n" +
                "            \"id\": 262,\n" +
                "            \"name\": \"Add Credit Note\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"78\",\n" +
                "            \"id\": 263,\n" +
                "            \"name\": \"Update Credit Note\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"79\",\n" +
                "            \"id\": 264,\n" +
                "            \"name\": \"View Credit Notes\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"80\",\n" +
                "            \"id\": 265,\n" +
                "            \"name\": \"Delete Credit Note\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"81\",\n" +
                "            \"id\": 266,\n" +
                "            \"name\": \"Validate Credit Note\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"82\",\n" +
                "            \"id\": 267,\n" +
                "            \"name\": \"View Reports\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"83\",\n" +
                "            \"id\": 268,\n" +
                "            \"name\": \"Add Roles\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"84\",\n" +
                "            \"id\": 269,\n" +
                "            \"name\": \"Update Roles\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"85\",\n" +
                "            \"id\": 270,\n" +
                "            \"name\": \"View Roles\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"86\",\n" +
                "            \"id\": 271,\n" +
                "            \"name\": \"Delete Roles\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"87\",\n" +
                "            \"id\": 272,\n" +
                "            \"name\": \"Add User\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"88\",\n" +
                "            \"id\": 273,\n" +
                "            \"name\": \"Update User\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"89\",\n" +
                "            \"id\": 274,\n" +
                "            \"name\": \"View Users\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"90\",\n" +
                "            \"id\": 275,\n" +
                "            \"name\": \"Validate Users\",\n" +
                "            \"selected\": true\n" +
                "        },\n" +
                "        {\n" +
                "            \"code\": \"91\",\n" +
                "            \"id\": 276,\n" +
                "            \"name\": \"Delete Users\",\n" +
                "            \"selected\": true\n" +
                "        }\n" +
                "    ]\n" +
                "}";
        JSONObject jo = new JSONObject(Admin);
        Role roleAdmin = new Gson().fromJson(jo.toString(), Role.class);
        return roleAdmin;
    }
}
