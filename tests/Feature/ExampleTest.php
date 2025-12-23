<?php

namespace Tests\Feature;

test('homepage returns successful response', function () {
    $response = $this->get('/');

    $response->assertOk();
});
