import { pgTable, varchar, text, uuid, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"


export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    rollNumber: varchar("roll_number").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updateddAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
    exams: many(userExam)
}))

export const exams = pgTable("exams", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    totalQuestions: integer("total_questions").notNull(),
    duration: integer("duration").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updateddAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
})

export const examsRelations = relations(exams, ({ many }) => ({
    users: many(userExam),
    questions: many(questions),

}))

export const userExam = pgTable("user_exam", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    examId: uuid("exam_id")
        .notNull()
        .references(() => exams.id, { onDelete: "cascade" }),

    answers: jsonb("answers").$type<Record<string, string>>().notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updateddAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
})

export const userExamRelations = relations(userExam, ({ one }) => ({
    user: one(users, {
        fields: [userExam.userId],
        references: [users.id],
    }),

    exam: one(exams, {
        fields: [userExam.examId],
        references: [exams.id],
    })
}))

export const questions = pgTable("questions", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    examId: uuid("exam_id").references(() => exams.id, { onDelete: "cascade" }).notNull(),
    text: text("text").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),

})

export const questionRelations = relations(questions, ({ many }) => ({
    options: many(options)
}))

export const options = pgTable("options", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    questionId: uuid("question_id").references(() => questions.id, { onDelete: "cascade" }).notNull(),
    text: text("text").notNull(),
    isCorrect: boolean("is_correct").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const optionRelations = relations(options, ({ one }) => ({
    question: one(questions, { fields: [options.questionId], references: [questions.id] })
}))


