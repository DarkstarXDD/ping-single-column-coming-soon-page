import "./styles.css"
import { z } from "zod"

let errorMessage = ""

const formEl = document.querySelector(".form")
const emailInputEl = document.querySelector(".input-email")
const errorTextEl = document.querySelector(".error")

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
})

formEl.addEventListener("submit", (event) => {
  event.preventDefault()

  const formData = {
    email: emailInputEl.value,
  }

  const validationResult = formSchema.safeParse(formData)

  if (!validationResult.success) {
    const validationResultFormatted = validationResult.error.format()
    errorMessage = validationResultFormatted.email?._errors.join(", ")
    errorTextEl.classList.remove("visually-hidden")
    emailInputEl.focus()
    emailInputEl.setAttribute("aria-invalid", true)
    emailInputEl.classList.add("input-email-error")
  } else {
    errorMessage = ""
    emailInputEl.value = ""
    errorTextEl.classList.add("visually-hidden")
    emailInputEl.blur()
    emailInputEl.setAttribute("aria-invalid", false)
    emailInputEl.classList.remove("input-email-error")
  }
  errorTextEl.innerHTML = `<p><i>${errorMessage}</i></p>`
})
