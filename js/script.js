const HERO_SECTION = document.getElementById('hero')
const LOADING_SECTION = document.getElementById('loading')
const CHOICE_SECTION = document.getElementById('choice')
const PRIZE_SECTION = document.getElementById('prize')
const OHH_MODAL = document.getElementById('ohh')
const WON_SECTION = document.getElementById('won')

const INIT_SECTION_BY_STEP = {
    '1': initHeroSection,
    '2': initLoadingSection,
    '3': initChoiceSection,
    '4': initPrizeSection,
    '5': initWonSection,
}

function initHeroSection() {
    HERO_SECTION.style.display = 'block'
    document.querySelectorAll('.hero__button').forEach(function (button) {
         button.addEventListener('click', function(event) {
             event.preventDefault()
             handleChangeStep('2')
             HERO_SECTION.style.display = 'none'
         }, {once: true})
    })
}

function initLoadingSection() {
    LOADING_SECTION.style.display = 'block'
    setTimeout(function () {
        handleChangeStep('3')
        LOADING_SECTION.style.display = 'none'
    }, 4500)
}

function initChoiceSection() {
    CHOICE_SECTION.style.display = 'block'
    document.getElementById('choice__button').addEventListener('click', function (event) {
        event.preventDefault()
        handleChangeStep('4')
        CHOICE_SECTION.style.display = 'none'
    }, {once: true})
}

function initPrizeSection() {
    PRIZE_SECTION.style.display = 'block'
    let counter = 1
    const BOX_ELEMENTS = document.querySelectorAll('.box')
    BOX_ELEMENTS.forEach(function (box) {
        box.addEventListener('click', function (event) {
            event.preventDefault()
            box.classList.add('active')

            if (counter === 1) {
                OHH_MODAL.style.display = 'block'
                document.getElementById('ohh_button').addEventListener('click', function (event) {
                    event.preventDefault()
                    OHH_MODAL.style.display = 'none'
                }, {once: true})
                counter++
            } else {
                counter = 1

                setTimeout(function () {
                    handleChangeStep('5')

                    BOX_ELEMENTS.forEach(function (box) {
                        box.classList.remove('active')
                    })

                    PRIZE_SECTION.style.display = 'none'
                }, 400)
            }
        }, {once: true})
    })
}

function initWonSection() {
    WON_SECTION.style.display = 'block'
    document.getElementById('won_button').addEventListener('click', function (event) {
        event.preventDefault()
        handleChangeStep('1')
        WON_SECTION.style.display = 'none'
    }, {once: true})
}

function handleGetStep() {
    const STEP = localStorage.getItem("STEP")
    if (typeof STEP === 'undefined') {
        localStorage.setItem('STEP', '1')
    }
    return STEP || '1'
}

function handleChangeStep(newStep) {
    localStorage.setItem('STEP', newStep)
    renderActiveStep()
}

function renderActiveStep() {
    const STEP = handleGetStep()
    const initActiveSection = INIT_SECTION_BY_STEP[STEP]
    !!initActiveSection && initActiveSection()
}

renderActiveStep()