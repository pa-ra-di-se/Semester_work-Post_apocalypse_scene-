# Задача: выполнить проект с использованием библиотек Three.js и GSAP. 
Проект должен иметь исходники на webpack. 
Сцена должна представлять из себя цельную композицию. 
 
## Работа обязательно должна включать в себя следующее: 
 
- Минимум 5 сложных объектов(состоящих из примитивов) на сцене  
    https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html
 
- Использование различных текстур для каждого объекта. Сайты, которые могут в этом помочь:   
    https://3dtextures.me/  
    https://www.arroway-textures.ch/    
    https://www.poliigon.com/  
    https://github.com/nidorx/matcaps  
 
- Для одного объекта использовать карты окружений в качестве текстур.     
    Карты можно взять отсюда - https://polyhaven.com/hdris    
    Преобразователь HDRI в кубические карты - https://matheowis.github.io/HDRI-to-CubeMap   
    Документация - https://threejs.org/docs/#api/en/loaders/CubeTextureLoader  
 
- Использование 2 вида методов для анимаций GreenSock, gsap.to или gsap.from и gsap.timeline:     
    https://greensock.com/docs/v3/GSAP/gsap.to()  
    https://greensock.com/docs/v3/GSAP/gsap.from()  
    https://greensock.com/docs/v3/GSAP/Timeline  
 
- Сделать доступным изменение всех параметров интерактивно c помощью  
    https://github.com/dataarts/dat.gui  
 
- Все анимации не должны зависеть от герцовости монитора на котором она воспроизводится,
а также при ресайзе экрана (https://developer.mozilla.org/ru/docs/Web/API/Window/resize_event ), 
сцена должна перестраиваться автоматически. 
 
- Написать название экспозиции с помощью 3d текста  
- Использовать минимум 2 любых источника света  
    (https://threejsfundamentals.org/threejs/lessons/threejs-lights.html ) 
 
- Сделать взимодействие сцены с любыми двумя слушателями событий  
    (https://developer.mozilla.org/ru/docs/Web/Events ) 
 
- Добавить тени   
    (https://threejs.org/manual/#en/shadows) 
 
- Реализовать разворачивание сцены на полный экран при двойном клике по левой кнопке мыши 