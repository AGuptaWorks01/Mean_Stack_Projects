const express = require('express')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const router = express.Router()
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json())

const JWT_SECRET = 'your_jwt_secret_key';

mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true }

})
const User = mongoose.model('User', UserSchema)

const ExpenseSchema = new mongoose.Schema({
    expense_name: { type: String, require: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})
const Expense = mongoose.model('Expense', ExpenseSchema)

async function protect(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });
    try {
        const decoded = JWT.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

router.post('/register', async (req, res) => {
    const { username, password, email, fullname } = req.body
    if (!username || !password || !email || !fullname) return res.status(400).json({ message: "Email and password are required" })

    const existsUser = await User.findOne({ username })
    if (existsUser) return res.status(400).json({ message: 'Email Already Exists' })

    const hasPasswerd = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hasPasswerd, email, fullname })
    try {
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration" })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: "Username and password are required" })
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ message: 'Invalid Email' })
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" })
    const token = JWT.sign({ username: user.username, userId: user._id }, JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ message: 'Login Successfull', token })
})

router.post('/expenses', protect, async (req, res) => {
    const { expense_name, amount, description, date } = req.body
    if (!expense_name || !amount || !description) return res.status(400).json({ message: 'All fields are required.' });

    const expenseDate = date ? new Date(date) : new Date()
    const expense = new Expense({ expense_name, amount, description, date: expenseDate, user: req.user.userId })
    try {
        await expense.save()
        res.status(201).json({ message: 'Expense created successfully.', expense });
    } catch (error) {
        res.status(500).json({ message: 'Error creating expense.' });

    }
})

router.get('/expenses', protect, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.userId })
        res.json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses.' });
    }
});

router.get('/expenses/:id', protect, async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Expense.findById(id);

        if (!affectedRows) return res.status(404).json({ message: 'id no found.' });
        res.json({ message: "id founded", affectedRows })
    } catch (error) {

    }
})


router.patch('/expenses/:id', protect, async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        )
        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found.' });
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense.' });
    }
})

router.delete('/expenses/:id', protect, async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id)
        if (!deletedExpense) return res.status(404).json({ message: 'Expense not found.' });
        res.json({ message: 'Expense deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense.' });
    }
})

app.use('/api', router)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})