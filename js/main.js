"use strict";

const petHunger = document.querySelector(".js_hunger");
const petEnergy = document.querySelector(".js_energy");
const petHappiness = document.querySelector(".js_happiness");

const feedBtn = document.querySelector(".js_feed");
const playBtn = document.querySelector(".js_play");
const sleepBtn = document.querySelector(".js_sleep");

let pet = {
  hunger: 100,
  energy: 100,
  happiness: 100,
  isAlive: true,
};
const savedPet = localStorage.getItem("pet");
//hay algo guardado con la clave pet?”
if (savedPet) {
  pet = JSON.parse(savedPet);
  //Convierte texto en objeto
}



// actualizar stats
//petHunger.textContent = pet.hunger -> es lo mismo pero evitará XSS en el futuro
function updateStats() {
  petHunger.innerHTML = `${pet.hunger}`;
  petEnergy.innerHTML = `${pet.energy}`;
  petHappiness.innerHTML = `${pet.happiness}`;
  localStorage.setItem("pet", JSON.stringify(pet));
}
function checkLife() {
  if (pet.hunger === 0 || pet.energy === 0 || pet.happiness === 0) {
    pet.isAlive = false;
    alert("Tu criatura ha muerto 💀");
  }
}

// acciones de los botones
feedBtn.addEventListener("click", () => {
  if (!pet.isAlive) {
    return;
  }
  pet.hunger = Math.min(100, pet.hunger + 10);
  updateStats();
});

playBtn.addEventListener("click", () => {
  if (!pet.isAlive) {
    return;
  }
  pet.happiness = Math.min(100, pet.happiness + 10);
  pet.energy = Math.max(0, pet.energy - 5);
  updateStats();
});

sleepBtn.addEventListener("click", () => {
  if (!pet.isAlive) {
    return;
  }
  pet.energy = Math.min(100, pet.energy + 10);
  updateStats();
});

updateStats();

setInterval(() => {
  pet.hunger = Math.max(0, pet.hunger - 1);
  pet.energy = Math.max(0, pet.energy - 1);
  pet.happiness = Math.max(0, pet.happiness - 1);

  updateStats();
  checkLife();
}, 3000); // cada 3 segundos

localStorage.setItem("pet", JSON.stringify(pet)); //guarda 