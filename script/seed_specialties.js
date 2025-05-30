const mongoose = require("mongoose");
const ENTSubject = require("../models/Subject");
const Specialty = require("../models/Specialty");

const specialtiesData = [
  {
    code: "B001",
    name: "Педагогика и психология",
    ent_subjects: ["Биология", "География"],
    universities: [
      "68393af295ae501b2e6221a1",
      "68393af895ae501b2e6221b0",
      "68393af595ae501b2e6221a7",
    ],
  },
  {
    code: "B002",
    name: "Дошкольное обучение и воспитание",
    ent_subjects: ["Биология", "География"],
    universities: [
      "68393af795ae501b2e6221ae",
      "68393af995ae501b2e6221b2",
      "68393af995ae501b2e6221b3",
    ],
  },
  {
    code: "B003",
    name: "Педагогика и методика начального обучения",
    ent_subjects: ["Биология", "География"],
    universities: ["68393af995ae501b2e6221b4"],
  },
  {
    code: "B004",
    name: "Подготовка учителей начальной военной подготовки",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af895ae501b2e6221b0"],
  },
  {
    code: "B005",
    name: "Подготовка учителей физической культуры",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af395ae501b2e6221a2"],
  },
  {
    code: "B006",
    name: "Подготовка учителей музыки",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af995ae501b2e6221b3", "68393af695ae501b2e6221a9"],
  },
  {
    code: "B007",
    name: "Подготовка учителей художественного труда и черчения",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af495ae501b2e6221a3"],
  },
  {
    code: "B008",
    name: "Подготовка учителей основы права и экономики",
    ent_subjects: ["Всемирная история", "География"],
    universities: ["68393af795ae501b2e6221ad", "68393af495ae501b2e6221a3"],
  },
  {
    code: "B009",
    name: "Подготовка учителей математики",
    ent_subjects: ["Математика", "Физика"],
    universities: [
      "68393af795ae501b2e6221ad",
      "68393af595ae501b2e6221a6",
      "68393af895ae501b2e6221af",
    ],
  },
  {
    code: "B010",
    name: "Подготовка учителей физики",
    ent_subjects: ["Математика", "Физика"],
    universities: ["68393af795ae501b2e6221ad", "68393af495ae501b2e6221a4"],
  },
  {
    code: "B011",
    name: "Подготовка учителей информатики",
    ent_subjects: ["Математика", "Информатика"],
    universities: ["68393af895ae501b2e6221b1"],
  },
  {
    code: "B012",
    name: "Подготовка учителей химии",
    ent_subjects: ["Химия", "Биология"],
    universities: [
      "68393af895ae501b2e6221b1",
      "68393af995ae501b2e6221b4",
      "68393af995ae501b2e6221b2",
    ],
  },
  {
    code: "B013",
    name: "Подготовка учителей биологии",
    ent_subjects: ["Биология", "География"],
    universities: ["68393af795ae501b2e6221ad"],
  },
  {
    code: "B014",
    name: "Подготовка учителей географии",
    ent_subjects: ["География", "Всемирная история"],
    universities: ["68393af795ae501b2e6221ad", "68393af695ae501b2e6221ab"],
  },
  {
    code: "B015",
    name: "Подготовка учителей по гуманитарным предметам",
    ent_subjects: ["Всемирная история", "География"],
    universities: ["68393af395ae501b2e6221a2"],
  },
  {
    code: "B016",
    name: "Подготовка учителей казахского языка и литературы",
    ent_subjects: ["Казахский язык", "Казахская литература"],
    universities: [
      "68393af895ae501b2e6221af",
      "68393af295ae501b2e6221a1",
      "68393af895ae501b2e6221b0",
    ],
  },
  {
    code: "B017",
    name: "Подготовка учителей русского языка и литературы",
    ent_subjects: ["Русский язык", "Русская литература"],
    universities: ["68393af495ae501b2e6221a5", "68393af695ae501b2e6221ab"],
  },
  {
    code: "B018",
    name: "Подготовка учителей иностранного языка",
    ent_subjects: ["Иностранный язык", "Всемирная история"],
    universities: ["68393af295ae501b2e6221a1", "68393af995ae501b2e6221b4"],
  },
  {
    code: "B019",
    name: "Подготовка социальных педагогов",
    ent_subjects: ["Биология", "География"],
    universities: ["68393af795ae501b2e6221ae"],
  },
  {
    code: "B020",
    name: "Специальная педагогика",
    ent_subjects: ["Биология", "География"],
    universities: ["68393af895ae501b2e6221b1"],
  },
  {
    code: "B021",
    name: "Исполнительское искусство",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: [
      "68393af895ae501b2e6221b0",
      "68393af295ae501b2e6221a1",
      "68393af695ae501b2e6221ab",
    ],
  },
  {
    code: "B022",
    name: "Музыковедение",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af495ae501b2e6221a4"],
  },
  {
    code: "B023",
    name: "Режиссура, арт-менеджмент",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af795ae501b2e6221ad"],
  },
  {
    code: "B024",
    name: "Искусствоведение",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af995ae501b2e6221b2"],
  },
  {
    code: "B025",
    name: "Дирижирование",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af295ae501b2e6221a1"],
  },
  {
    code: "B026",
    name: "Композиция",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af395ae501b2e6221a2"],
  },
  {
    code: "B027",
    name: "Театральное искусство",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af395ae501b2e6221a2", "68393af995ae501b2e6221b2"],
  },
  {
    code: "B028",
    name: "Хореография",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af995ae501b2e6221b4", "68393af995ae501b2e6221b2"],
  },
  {
    code: "B029",
    name: "Аудиовизуальные средства и медиа производство",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af295ae501b2e6221a1", "68393af695ae501b2e6221ab"],
  },
  {
    code: "B030",
    name: "Изобразительное искусство",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: [
      "68393af495ae501b2e6221a4",
      "68393af295ae501b2e6221a1",
      "68393af695ae501b2e6221ab",
    ],
  },
  {
    code: "B031",
    name: "Мода, дизайн",
    ent_subjects: ["Творческий экзамен", "Творческий экзамен"],
    universities: ["68393af795ae501b2e6221ad", "68393af895ae501b2e6221b1"],
  },
  {
    code: "B032",
    name: "Философия и этика",
    ent_subjects: ["Всемирная история", "География"],
    universities: ["68393af695ae501b2e6221ab", "68393af995ae501b2e6221b4"],
  },
  {
    code: "B033",
    name: "Религия и теология",
    ent_subjects: ["Творческий экзамен", "История Казахстана"],
    universities: ["68393af995ae501b2e6221b2"],
  },
  {
    code: "B034",
    name: "История",
    ent_subjects: ["История Казахстана", "Всемирная история"],
    universities: ["68393af395ae501b2e6221a2"],
  },
  {
    code: "B035",
    name: "Тюркология",
    ent_subjects: ["Казахский язык", "Всемирная история"],
    universities: [
      "68393af995ae501b2e6221b3",
      "68393af895ae501b2e6221af",
      "68393af295ae501b2e6221a1",
    ],
  },
  {
    code: "B036",
    name: "Переводческое дело",
    ent_subjects: ["Казахский язык", "Иностранный язык"],
    universities: ["68393af895ae501b2e6221af"],
  },
  {
    code: "B037",
    name: "Филология",
    ent_subjects: ["Казахский язык", "Казахская литература"],
    universities: ["68393af995ae501b2e6221b4", "68393af595ae501b2e6221a7"],
  },
  {
    code: "B038",
    name: "Социология",
    ent_subjects: ["История Казахстана", "Основы социально-гуманитарных наук"],
    universities: ["68393af895ae501b2e6221af"],
  },
  {
    code: "B039",
    name: "Культурология",
    ent_subjects: [
      "История Казахстана",
      "Организация работы социальных учреждений",
    ],
    universities: ["68393af595ae501b2e6221a8", "68393af695ae501b2e6221aa"],
  },
  {
    code: "B040",
    name: "Политология",
    ent_subjects: ["История Казахстана", "Основы социально-гуманитарных наук"],
    universities: [
      "68393af595ae501b2e6221a7",
      "68393af495ae501b2e6221a3",
      "68393af695ae501b2e6221a9",
    ],
  },
  {
    code: "B041",
    name: "Психология",
    ent_subjects: ["История Казахстана", "Основы психологии"],
    universities: ["68393af495ae501b2e6221a3"],
  },
  {
    code: "B042",
    name: "Журналистика и репортерское дело",
    ent_subjects: ["Творческий экзамен", "Казахский язык"],
    universities: ["68393af495ae501b2e6221a3", "68393af695ae501b2e6221aa"],
  },
  {
    code: "B043",
    name: "Библиотечное дело, обработка информации и архивное дело",
    ent_subjects: ["Казахский язык", "Организация делопроизводства"],
    universities: ["68393af795ae501b2e6221ae", "68393af495ae501b2e6221a3"],
  },
  {
    code: "B044",
    name: "Менеджмент и управление",
    ent_subjects: ["Основы экономики", "Менеджмент"],
    universities: [
      "68393af695ae501b2e6221aa",
      "68393af795ae501b2e6221ae",
      "68393af695ae501b2e6221ab",
    ],
  },
  {
    code: "B045",
    name: "Аудит и налогообложение",
    ent_subjects: ["Финансы и кредит", "Экономика организации"],
    universities: ["68393af595ae501b2e6221a8", "68393af995ae501b2e6221b4"],
  },
];

mongoose
  .connect(
    "mongodb+srv://nurrs:data@cluster0.njpnsaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      dbName: "test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedSpecialties(specialtiesData);
    await mongoose.disconnect();
    console.log("Disconnected");
  })
  .catch(console.error);

async function seedSpecialties(specialtiesData) {
  try {
    for (const specialty of specialtiesData) {
      const subjectIds = [];

      for (const subjectName of specialty.ent_subjects) {
        const subject = await ENTSubject.findOneAndUpdate(
          { name: subjectName },
          { name: subjectName },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        subjectIds.push(subject._id);
      }

      await Specialty.findOneAndUpdate(
        { code: specialty.code },
        {
          code: specialty.code,
          name: specialty.name,
          ent_subjects: subjectIds,
          universities: specialty.universities, // ✅ Add this line
          degree_type: "Бакалавриат",
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log("✅ All specialties inserted successfully.");
  } catch (err) {
    console.error("❌ Error seeding specialties:", err);
  }
}
