This app was developed with a cloud-first approach. 

## Client-Side Server

For the [client-side stack](https://github.com/Documenting-Ukraine/War-Chronicle-Client-App), we use **Typescript** and **React**. In addition, styles are written in **SCSS** and compiled to CSS, prior to deployment. This server is hosted on an **AWS S3 Bucket** and served through **AWS Cloudfront**. This server uses Client-side rendering (CSR), to reduce costs. Although this may hinder SEO, it was considered a feasible trade-off for cost-reduction. In the future, this may be converted to Server-Side Rendering (SSR) but doing so will require the stack to be moved off S3 and Cloudfront, and moved to an EC2 instance, or something equivalent. 

## Overview Presentation
For the entire tech stack, along with service breakdowns, and estimated financial costs, please refer to this [presentation](https://docs.google.com/presentation/d/1rWaSkMQ7opej9cV37Axrmblcv2ZVQxvTvYXrlAES3S8/edit?usp=sharing)
