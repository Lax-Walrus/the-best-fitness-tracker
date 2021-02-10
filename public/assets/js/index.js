$(function () {
  $(".newWorkout").on("submit", (event) => {
    event.preventDefault();

    const userWorkOut = $("#reg-name-input").val().trim();

    $.ajax({
      url: "/api/workouts",
      method: "POST",
      data: { name: userWorkOut },
    }).then((data) => {
      location.reload;
    });
  });
});

$(".update").on("submit", (event) => {
  event.preventDefault();

  const updatedWorkout = {
    _id: $(this).attr("id"),
    name: event.target[0].value.trim(),
    rep: event.target[1].value.trim(),
    unit: event.target[2].value.trim(),
    notes: event.target[3].value.trim(),
  };
  console.table(updatedWorkout);

  $.ajax({
    url: "/api/exercise",
    method: "PUT",
    data: updatedWorkout,
  }).then((data) => location.reload);
});

$(".userExercise").on("click", (event) => {
  event.preventDefault();
  const newExerciseObj = {
    _id: $(this).attr("id"),
    name: event.target[0].value.trim(),
    rep: event.target[1].value.trim(),
    unit: event.target[2].value.trim(),
    notes: event.target[3].value.trim(),
  };
  console.table(newExerciseObj);

  $.ajax({
    url: "/api/exercise",
    method: "POST",
    data: newExerciseObj,
  }).then((data) => {
    $.ajax({
      url: "",
      context: document.body,
      success: (data, err) => {
        $(this).html(data);
      },
    });
  });
});

$(".delete").on("click", (event) => {
  event.preventDefault();
  $.ajax({
    url: "/api/exercise",
    method: "DELETE",
    data: { _id: $(this).attr("id") }.then((data) => {
      $.ajax({
        url: "/",
        context: document.body,
        success: (data, err) => {
          if (err) console.error(err);
          $(this).html(data);
        },
      });
    }),
  });
});

$(".removeWorkout").on("click", (event) => {
  event.preventDefault();
  $.ajax({
    url: "/api/workouts",
    method: "DELETE",
    data: { _id: $(this).attr("id") }.then((data) => {
      console.log(data);
    }),
  });
});
