PART - A
---------
// backend
cd -> ICRT_task/backend 
npm install 
node server.js

// frontend
cd -> ICRT_task/frontend
npm install
npm run serve

--------------------------------------------------------------------------------------------------------------------------------------------
PART - B
---------
1. Database Schema: Draft a relational database schema to store users, product details, and metrics. 
Outline your table structures, primary/foreign keys, and any indexes you would use to optimize lookups.

// User Organisation
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

// Enum for User Roles
CREATE TYPE user_role AS ENUM ('basic', 'premium', 'enterprise', 'admin');

// User Details
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role NOT NULL DEFAULT 'basic',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

// Product Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

// Product Details
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    product_count INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),  
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_product_model UNIQUE (name, model)
);

// Product Metrics
CREATE TABLE product_metrics (
    id BIGSERIAL PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    score NUMERIC(3, 2) NOT NULL CHECK (score >= 0 AND score <= 100),
    ttr_days NUMERIC(4, 2) NOT NULL CHECK (ttr_days >= 0),
    download_id VARCHAR(50) UNIQUE,
    evaluated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

// Download Logs
CREATE TABLE download_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    report_type VARCHAR(50) NOT NULL DEFAULT 'download_report.pdf',
    downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

Indexing for Optimisation:

* Faster Authentication
CREATE UNIQUE INDEX idx_users_email ON users(email);

* Role access verification
CREATE INDEX idx_users_org_role ON users(organization_id, role);

* Category based indexing for dashboard queries
CREATE INDEX idx_product_details ON products(category_id, name) WHERE is_active = TRUE;

--------------------------------------------------------------------------------------------------------------------------------------------

2. API Security: Detail conceptually how you would secure the backend API endpoint on the server side. 
How do you ensure a malicious "Basic" user cannot bypass your frontend UI restriction to call the API directly and download raw Enterprise data?

A strong API Security can be achieved by authenticating the identity, permissions and data integrity in all possible layers on the server. 
The client is completely untrusted, means UI level authentications can be easily breached. So, all possible security measures must be implemented on the server. 

Authentication using JWT:
When the client raise an API request with user details(username, password) during login, the server authenticates the login by creating a JWT (JSON Web Token) using jsonwebtoken library. 
The JWT encrypts the user data by generating a token consists of Header (specifies the signing algorithm, eg: HS256), Payload (contains user details in JSON) and Signature (generated using a private key from the server side). 
This generated JWT token will be send as a response to the client from server, the client will store this token into the local storage which has an expiration time (expiresIn property is used JWT sign function). 
Once the token is stored, then whenever the client sends an API request, it attaches the JWT token in the Authorization Header for subsequent requests.
When the API request reaches the server, an authentication middleware authenticates the auth header to check whether the token exists. 
If the token exists, then the middleware decodes and verifies the token to check if its a valid token and sends back the required response to the client request. 
If a “Basic” user attempts to modify the role as “Enterprise” locally and tries to access the report for download, the authorization check fails and returns a 401 Unauthorised response.

Data Layer Authentication:
In some cases, even if the user bypasses the JWT authentication then by using Data layer authentication we can prevent unauthorized access. 
While retrieving the raw Enterprise data from the database, we cannot retrieve the data based on the client request parameters alone. 
To prevent the data, implement the authenticated user verified identity, organisation or subscription level in every database query directly into the WHERE clause. 
If a “Basic” user attempts to access the query of Enterprise data, then the database returns no record found, this prevents the data leakage in the Data Layer.

Rate Limiting:
To improve security against Automated Scarping or any Brute-Force Hacking technique where the user tries to login with several password combinations such as millions of combinations per second, 
a middleware can be used to login and download reports API calls to restrict the maximum number of requests allowed within a specific time window like 10 requests per 5 mins.

--------------------------------------------------------------------------------------------------------------------------------------------

3. AI Code Vetting: As a developer leveraging AI development tools to write code, 
what are the top two security or performance vulnerabilities you actively look out for in AI-generated code, and how do you vet them?

The top two vulnerabilities for AI generated code
Data Layer Security
Package Vulnerability and Algorithmic Inefficiency

Data Layer Security:
AI models mostly prioritise in generating functional code rather than focusing more on secure architecture. 
AI models often create direct database queries or handles routes from the client with just request params and not authenticating role permissions or any server side JWT authentication middleware. 
To vet this process, audit every AI generated query or API endpoints to ensure that the database is strictly verified with the authenticated user role access and JWT token verification. 
Integration of Static Application Security Testing(SAST) tools like SonarQube to flag unparameterised queries and missing authorisation checks before merging the code.

Package Vulnerability and Algorithmic Inefficiency:
AI coding tools frequently install deprecated, unmaintained or non existent packages, this might result in performance vulnerability or reliability risks. 
Additionally, AI coding tools generates functionally correct algorithmic logics but the complexity of the logic impacts the performance and results in inefficiency. 
To vet this process, manually verify every new dependencies suggested by AI tools before registering the packages(by executing npm install), 
refactor nested loops or collections into preprocessing datasets, ensuring large file operations use streams rather than loading entire payload into memory.

--------------------------------------------------------------------------------------------------------------------------------------------