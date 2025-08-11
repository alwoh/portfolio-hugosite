---
title: "First Post"
date: 2025-08-07T14:40:03-06:00
draft: false
author: Alex Wohlleber
year: "2025"
month: "2025/08"
categories:
- Personal
- Thoughts
tags:
- software
- html
keywords:
- bookstore
---



Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in est arcu. Sed non orci at mauris vestibulum vulputate. Aenean porttitor turpis a nulla fermentum molestie. Praesent lobortis tristique velit, non hendrerit diam. Fusce non vehicula metus. Ut in dignissim metus, non placerat elit. In ullamcorper libero dui, accumsan vulputate purus commodo ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam eleifend nulla a quam ultricies, nec sollicitudin turpis posuere. Nullam vitae velit sapien.

Phasellus a dui pulvinar, eleifend sem vel, suscipit erat. Etiam fermentum imperdiet ante, vel consectetur quam aliquet non. Curabitur ultricies suscipit molestie. Nam in ultricies lorem, sit amet vehicula mauris. Aenean pulvinar justo massa, id congue nisi facilisis sit amet. Phasellus mattis sem velit, at porttitor nunc mollis at. Mauris risus velit, vestibulum quis odio sed, porttitor tincidunt leo. Curabitur at sapien odio. In id sapien laoreet, elementum lectus at, fringilla magna.

Curabitur bibendum enim nunc, ac tincidunt enim condimentum in. Etiam in facilisis nibh, et sollicitudin ante. Nunc fringilla turpis nec nisl ultricies, in fermentum dolor hendrerit. Mauris malesuada cursus elit non ullamcorper. Vivamus tempor justo vitae tellus eleifend, at sollicitudin justo finibus. Nulla accumsan volutpat porta. Nullam at luctus dui. Quisque lacus quam, convallis sed libero vel, placerat tincidunt lorem. Nulla in enim id sem dictum imperdiet et at leo. Ut in congue tortor.

Nunc interdum justo id velit finibus gravida. Nunc id elementum libero, in rutrum ipsum. Maecenas aliquam condimentum nisi vitae condimentum. In hac habitasse platea dictumst. Curabitur a eleifend magna. Nullam consequat felis turpis, sed molestie lacus condimentum ac. Nam placerat mattis mi, sed porttitor urna convallis at. Duis lectus mauris, sodales ut leo vitae, rutrum volutpat massa. Phasellus porttitor sollicitudin lorem eu tempor. Morbi tincidunt risus ac ipsum auctor, a vulputate ante feugiat. Mauris. 

<!--more-->

```c# {linenos=inline}
  public int MaxSubArray(int[] nums) {
        int sum = 0;
        int maxSum = nums[0];
        
        for (int i = 0; i < nums.Length; i++)
        {
           sum += nums[i];
           if (nums[i] > sum){
               sum = nums[i];
           }
            
            if (sum > maxSum){
                maxSum = sum;
            }
        }
        return maxSum;
    }
```

