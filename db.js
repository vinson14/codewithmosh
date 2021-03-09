const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        res = await mongoose.connect("mongodb://localhost/mongo-exercises", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (res) console.log("Connected to MongoDB...");
    } catch (err) {
        console.log(err);
    }
};

const courseSchema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true },
    author: String,
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "There should be at least 1 tag",
        },
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
    },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
    const course = new Course({
        _id: "7",
        name: "New course testing tags",
        author: "Vinson",
        tags: [true, true],
        isPublished: false,
        // price: 100,
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
};

const getCourses = async () => {
    const courses = await Course.find()
        .sort({ price: -1 })
        .select({ _id: false, name: true, author: true, isPublished: true });
    console.log(courses);
};

const updateCourse = async (id) => {
    const course = await Course.findOne({ _id: id });
    console.log(course);
    course.isPublished = true;
    result = await course.save();
    console.log(result);
};

const removeCourse = async (id) => {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
};

connectToDb();
createCourse();
