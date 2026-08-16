
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check input
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }

        console.log("LOGIN EMAIL:", email);

        // ========================================
        // FIND USER
        // ========================================

        const sql = `
            SELECT
                id,
                first_name,
                last_name,
                email,
                phone,
                date_of_birth,
                gender,
                account_type,
                account_name,
                account_number,
                balance,
                password
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        db.query(
            sql,
            [email],
            async (err, results) => {

                // ========================================
                // DATABASE ERROR
                // ========================================

                if (err) {

                    console.error(
                        "LOGIN DATABASE ERROR:",
                        err
                    );

                    return res.status(500).json({
                        success: false,
                        message: "Database error",
                        error: err.message
                    });

                }


                // ========================================
                // USER NOT FOUND
                // ========================================

                if (!results || results.length === 0) {

                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    });

                }


                // ========================================
                // GET USER
                // ========================================

                const user = results[0];


                // ========================================
                // CHECK PASSWORD
                // ========================================

                const passwordMatch =
                    await bcrypt.compare(
                        password,
                        user.password
                    );


                if (!passwordMatch) {

                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    });

                }


                // ========================================
                // REMOVE PASSWORD
                // ========================================

                delete user.password;


                // ========================================
                // SUCCESS
                // ========================================

                return res.status(200).json({

                    success: true,

                    message: "Login successful",

                    user: user

                });

            }
        );

    } catch (error) {

        console.error(
            "LOGIN SERVER ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }

};