---
title: Desmos Complex Function Plotter
date: 2024-12-14
id: desmos-complex-function-plotter
---
I made this when I was taking Complex Analysis (MA425) at Purdue, or rather, when I was procrastinating studying for our final exam. I took it upon myself to recreate <a href="https://samuelj.li/complex-function-plotter/">https://samuelj.li/complex-function-plotter/</a> entirely in Desmos. It is certainly not efficient, very numerically unstable, and inconvenient to use. However, implementing it forced me to get very familiar with what exactly is being represented by these plots.

This Desmos graph relies on a lot of sketchy (modular?) inequalities, in 3 different layers: the hue of the color represents the arg, brightness represents magnitude, and everything is overlayed with the image of the unit grid under the conformal mapping.

<div class="iframe-container">
    <figure>
        <iframe class="embed" src="https://www.desmos.com/calculator/8d3fc3162c?embed" width="500" height="500" title="Interactive complex function plotter on Desmos"></iframe>
        <figcaption><a href="https://www.desmos.com/calculator/8d3fc3162c">https://www.desmos.com/calculator/8d3fc3162c</a></figcaption>
    </figure>
</div>