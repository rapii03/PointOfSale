import { useForm, useFieldArray, Controller } from "react-hook-form"


function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "anything" } })


  const onSubmit = (data) => {
    // It's recommended to reset in useEffect as execution order matters
    // reset({ ...data })
  }


  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: "" })
    }
  }, [formState, submittedData, reset])


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("something")} />
      <input type="submit" />
    </form>
  )
}